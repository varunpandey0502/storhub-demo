# StorHub Self-Storage Website

A modern, responsive website for StorHub self-storage facilities built with Next.js, Tailwind CSS, and Payload CMS. This project provides a complete solution for managing storage facility content, including locations, districts, storage units, and customer inquiries.

## Features

- **Content Management**: Complete CMS for managing all website content
- **Location-based Browsing**: Filter storage facilities by city and district
- **Hero Slider**: Dynamic hero section with auto-scrolling banners
- **Form Builder**: Custom form builder for quote requests and inquiries
- **Size Estimator**: Tool to help customers estimate their storage needs
- **S3 Media Storage**: Cloud storage for all media assets

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **CMS**: Payload CMS
- **Database**: PostgreSQL
- **Storage**: AWS S3
- **Deployment**: Docker-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- AWS S3 bucket for media storage

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/storhub-website.git
   cd storhub-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in the required environment variables (see Environment Variables section)

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the website
   - The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URI=postgres://username:password@localhost:5432/storhub

# Payload Secret (generate a random string)
PAYLOAD_SECRET=your-secret-key-here

# S3 Configuration
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_REGION=your-region (e.g., ap-southeast-1)
S3_BUCKET=your-bucket-name
```

## Content Structure

The website is built around these main content types:

- **Locations**: Cities where StorHub operates
- **Districts**: Areas within cities
- **Storage Facilities**: Individual storage locations mapped to districts
- **Services**: Types of storage services offered
- **Size Estimator**: Tool to help customers choose the right storage size
- **Forms**: Custom forms for quote requests and inquiries

## Admin Setup

After starting the server, create an admin user by visiting `/admin` and following the registration process. Then, populate the website with content:

1. **Upload Media**: Add logos, banners, and other images
2. **Create Locations**: Add cities where StorHub operates
3. **Create Districts**: Add districts within each city
4. **Create Storage Facilities**: Add individual storage facilities and map them to districts
5. **Set Up Services**: Add the services StorHub offers
6. **Create Forms**: Set up quote request forms
7. **Configure Homepage**: Set up the homepage global with all the necessary content

## Sample Content Structure

### Locations

- Shanghai
- Beijing
- Shenzhen

### Districts (per city)

- **Shanghai**: Pudong, Jing'an, Huangpu, Xuhui, Changning
- **Beijing**: Chaoyang, Haidian, Dongcheng, Xicheng, Fengtai
- **Shenzhen**: Futian, Nanshan, Luohu, Longgang, Bao'an

### Storage Facilities

Example facility:

- **Name**: StorHub Pudong Center
- **District**: Pudong
- **Address**: 123 Century Avenue, Pudong New Area
- **Features**: 24/7 Access, Climate Control, Security Cameras
- **Available Sizes**: S (1-5m²), M (5-10m²), L (10-15m²)

## Deployment

This project is ready for deployment on any platform that supports Next.js applications. For production deployment:

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Troubleshooting

- **Database Connection Issues**: Ensure your PostgreSQL server is running and the connection string is correct
- **S3 Upload Errors**: Verify your AWS credentials and bucket permissions
- **Form Submission Errors**: Check that the form-submissions API route is properly configured

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Payload CMS](https://payloadcms.com/) for the headless CMS
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
