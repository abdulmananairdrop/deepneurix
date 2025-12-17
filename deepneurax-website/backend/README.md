# Strapi Backend Schema Files

This folder contains the Strapi content type schema files for your backend.

## Setup Instructions

### Option 1: Manual Import (Recommended)

1. **Copy the files to your Strapi project:**
   ```bash
   # Copy component
   cp backend/components/why-choose-us/item.json YOUR_STRAPI_PROJECT/src/components/why-choose-us/item.json
   
   # Copy content type
   cp backend/api/why-choose-us/content-types/why-choose-us/schema.json YOUR_STRAPI_PROJECT/src/api/why-choose-us/content-types/why-choose-us/schema.json
   ```

2. **Restart your Strapi server:**
   ```bash
   cd YOUR_STRAPI_PROJECT
   npm run develop
   ```

3. **The content type will be automatically registered!**

### Option 2: Manual Creation in Strapi Admin

If you prefer to create manually:

#### Step 1: Create the Component
1. Go to **Content-Type Builder**
2. Click **"Create new component"**
3. Category: `why-choose-us`
4. Name: `item`
5. Add these fields:
   - **title** (Text, Required)
   - **description** (Long text, Required)
   - **image** (Media - Single, Required, Images only)
   - **link** (Text, Optional)
   - **order** (Number - Integer, Default: 0)
6. Save

#### Step 2: Create the Single Type
1. Click **"Create new single type"**
2. Display name: `Why Choose Us`
3. Add these fields:
   - **sectionTitle** (Text, Required, Default: "Why Choose Us")
   - **sectionDescription** (Long text, Default: "We deliver exceptional results through innovation, expertise, and dedication")
   - **items** (Component - Repeatable, Required, Minimum: 1)
     - Select component: `why-choose-us.item`
4. Save

#### Step 3: Configure Permissions
1. Go to **Settings** → **Roles** → **Public**
2. Enable permissions:
   - **Why-choose-us**: `find`
3. Save

#### Step 4: Add Content
1. Go to **Content Manager** → **Why Choose Us** (Single Type)
2. Fill in:
   - Section Title: "Why Choose Us"
   - Section Description: "We deliver exceptional results through innovation, expertise, and dedication"
3. Add items (click "Add an entry"):
   - Example 1:
     - Title: "24/7 Support"
     - Description: "Round-the-clock assistance whenever you need it"
     - Image: Upload an image
     - Link: "/support" (optional)
     - Order: 1
   - Example 2:
     - Title: "Innovation First"
     - Description: "Cutting-edge solutions for modern challenges"
     - Image: Upload an image
     - Link: "/innovation"
     - Order: 2
   - Add more items as needed...
4. **Publish**

## API Endpoint

Once set up, your data will be available at:
```
GET http://localhost:1337/api/why-choose-us?populate=deep
```

## Frontend Integration

The frontend is already configured to fetch and display this data. Once you add content in Strapi and publish it, it will automatically appear on your website!

## Example Response

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "sectionTitle": "Why Choose Us",
      "sectionDescription": "We deliver exceptional results through innovation, expertise, and dedication",
      "items": [
        {
          "id": 1,
          "title": "24/7 Support",
          "description": "Round-the-clock assistance whenever you need it",
          "link": "/support",
          "order": 1,
          "image": {
            "data": {
              "attributes": {
                "url": "/uploads/support_image.jpg"
              }
            }
          }
        }
      ]
    }
  }
}
```

## Troubleshooting

### Content Type Not Appearing
- Make sure you copied files to the correct location
- Restart Strapi server: `npm run develop`
- Check Strapi logs for errors

### Permission Denied Error
- Go to Settings → Roles → Public
- Enable `find` permission for Why-choose-us
- Save and try again

### Images Not Loading
- Make sure images are uploaded in Strapi
- Check that the `populate=deep` parameter is included in API call
- Verify CORS settings if images are on different domain
