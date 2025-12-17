import type { Schema, Struct } from '@strapi/strapi';

export interface HeroBackgroundVideo extends Struct.ComponentSchema {
  collectionName: 'components_hero_background_videos';
  info: {
    description: 'Video for hero background with optional thumbnail';
    displayName: 'Background Video';
  };
  attributes: {
    duration: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<10>;
    thumbnail: Schema.Attribute.Media<'images'>;
    video: Schema.Attribute.Media<'videos'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface WhyChooseUsItem extends Struct.ComponentSchema {
  collectionName: 'components_why_choose_us_items';
  info: {
    description: '';
    displayName: 'Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero.background-video': HeroBackgroundVideo;
      'why-choose-us.item': WhyChooseUsItem;
    }
  }
}
