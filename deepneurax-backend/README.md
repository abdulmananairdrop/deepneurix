# DeepNeurax Strapi Backend

This is the Strapi CMS backend for the DeepNeurax website.

## ✅ Setup Complete!

All 10 content types have been pre-configured:
- ✅ **Hero** (Single Type) - Homepage hero section
- ✅ **Service** (Collection) - Services offered
- ✅ **Product** (Collection) - Products showcase
- ✅ **Feature** (Collection) - Features and benefits
- ✅ **Metric** (Collection) - Statistics and metrics
- ✅ **Case Study** (Collection) - Success stories
- ✅ **Testimonial** (Collection) - Client testimonials
- ✅ **Blog Post** (Collection) - Blog articles
- ✅ **CTA** (Single Type) - Call-to-action section
- ✅ **Footer** (Single Type) - Footer information

## 🚀 Next Steps

### 1. Create Admin Account
Visit http://localhost:1337/admin and create your first admin account

### 2. Set Public Permissions
1. Go to **Settings → Roles → Public**
2. Enable `find` and `findOne` for all content types
3. Click **Save**

### 3. Generate API Token
1. Go to **Settings → API Tokens**
2. Create new token (Read-only, Unlimited)
3. Copy the token for your frontend `.env.local`

### 4. Add Content

**Option A: Use Seed Script (Quick)**
```bash
# Run the interactive seeder
seed.bat

# Or manually:
$env:STRAPI_API_TOKEN="your-full-access-token"; node seed.js
```

**Option B: Manual Content Creation**
1. Go to **Content Manager**
2. Create and publish entries for each content type

See [SEEDING.md](SEEDING.md) for detailed instructions.

## 📝 Commands

```bash
# Development (auto-reload)
npm run develop

# Production
npm run build
npm run start

# Other Strapi commands
npm run strapi help
```

## 🔗 API Endpoints

- `GET /api/heroes` - Hero section
- `GET /api/services` - Services
- `GET /api/products` - Products
- `GET /api/features` - Features
- `GET /api/metrics` - Metrics
- `GET /api/case-studies` - Case studies
- `GET /api/testimonials` - Testimonials
- `GET /api/blog-posts` - Blog posts
- `GET /api/ctas` - CTA
- `GET /api/footers` - Footer

Example: `http://localhost:1337/api/services?populate=*`

## 📚 Documentation

See `../deepneurax-website/STRAPI_SETUP_GUIDE.md` for detailed setup instructions.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
