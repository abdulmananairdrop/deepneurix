# Seeding Dummy Content

This guide will help you populate your Strapi backend with dummy content.

## Quick Start

### Step 1: Create Admin Account
1. Go to http://localhost:1337/admin
2. Create your admin account

### Step 2: Set Public Permissions
1. Go to **Settings → Roles → Public**
2. Enable `find` and `findOne` for all content types:
   - Hero, Service, Product, Feature, Metric
   - Case Study, Testimonial, Blog Post, CTA, Footer
3. Click **Save**

### Step 3: Generate API Token
1. Go to **Settings → API Tokens**
2. Click **Create new API Token**
3. Configure:
   - Name: `Seeder`
   - Token type: **Full access** (needed for creating content)
   - Duration: `Unlimited`
4. **Copy the token!**

### Step 4: Run the Seed Script

```bash
# Set your API token as environment variable
$env:STRAPI_API_TOKEN="your-token-here"

# Run the seeder
node seed.js
```

Or run in one command:
```bash
$env:STRAPI_API_TOKEN="your-token-here"; node seed.js
```

### Step 5: Publish Content
1. Go to **Content Manager** in Strapi admin
2. Click on each content type
3. Select all entries
4. Click **Publish** button

## What Gets Created

The seed script will create:

- ✅ 1 Hero section
- ✅ 4 Services
- ✅ 3 Products
- ✅ 4 Features
- ✅ 4 Metrics
- ✅ 3 Case Studies
- ✅ 3 Testimonials
- ✅ 3 Blog Posts
- ✅ 1 CTA section
- ✅ 1 Footer

## Manual Content Creation

If you prefer to create content manually:

1. Go to **Content Manager**
2. Select a content type from the left sidebar
3. Click **Create new entry**
4. Fill in the fields
5. Click **Save** and then **Publish**

## Dummy Content Details

### Hero Section
- Title: "Transform Your Business with AI"
- Includes buttons, colors, and descriptions

### Services
1. AI Consulting
2. Machine Learning
3. Data Analytics
4. Computer Vision

### Products
1. NeuraxAI Platform
2. AutoML Suite
3. DataViz Pro

### Blog Posts
1. "The Future of AI in Business"
2. "Getting Started with Machine Learning"
3. "5 Ways AI Can Transform Your Customer Service"

All content includes realistic descriptions, links, and styling colors.

## Troubleshooting

**Error: Unauthorized**
- Make sure you set the API_TOKEN environment variable
- Ensure the token has "Full access" permissions

**Error: Connection refused**
- Verify Strapi is running at http://localhost:1337
- Check `npm run develop` is active

**Content not showing on frontend**
- Make sure to **Publish** all entries in Content Manager
- Verify Public permissions are set (find, findOne)
- Check frontend .env.local has correct STRAPI_URL and API_TOKEN

## Next Steps

After seeding:
1. Visit your Next.js app at http://localhost:3000
2. You should see all the dummy content
3. Customize the content in Strapi admin as needed
4. Add your own images through the Media Library
