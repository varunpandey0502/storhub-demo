import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import Link from 'next/link'

// Format constants
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_SUBSCRIPT = 32
const IS_SUPERSCRIPT = 64

interface RichTextProps {
  content: any // The serialized Lexical content
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content) return null

  // If content is a string (for backward compatibility)
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  // For Lexical editor, content will be an object with a root property
  const serializedNodes = content?.root?.children || []

  return <SerializeLexical nodes={serializedNodes} />
}

interface SerializeLexicalProps {
  nodes: any[]
}

const SerializeLexical: React.FC<SerializeLexicalProps> = ({ nodes }) => {
  if (!nodes || !Array.isArray(nodes)) return null

  return (
    <Fragment>
      {nodes.map((node, index) => {
        if (!node) return null

        // Handle text nodes
        if (node.type === 'text') {
          let text = (
            <span key={index} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
          )

          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        // Handle element nodes with children
        const children = node.children ? <SerializeLexical nodes={node.children} /> : null

        // Handle different node types
        switch (node.type) {
          case 'linebreak':
            return <br key={index} />

          case 'paragraph':
            return <p key={index}>{children}</p>

          case 'heading':
            const Tag = `h${node.tag}` as keyof JSX.IntrinsicElements
            return React.createElement(Tag, { key: index }, children)

          case 'list':
            const ListTag = node.listType === 'number' ? 'ol' : 'ul'
            return React.createElement(ListTag, { key: index, className: node.listType }, children)

          case 'listitem':
            if (node.checked != null) {
              return (
                <li
                  key={index}
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={`list-item-checkbox ${node.checked ? 'checked' : 'unchecked'}`}
                  value={node.value}
                >
                  {children}
                </li>
              )
            }
            return (
              <li key={index} value={node.value}>
                {children}
              </li>
            )

          case 'quote':
            return <blockquote key={index}>{children}</blockquote>

          case 'link':
            const fields = node.fields || {}
            if (fields.linkType === 'custom') {
              return (
                <Link
                  href={escapeHTML(fields.url || '#')}
                  key={index}
                  {...(fields.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {children}
                </Link>
              )
            }
            return <span key={index}>Internal link</span>

          default:
            return null
        }
      })}
    </Fragment>
  )
}

export default RichText
