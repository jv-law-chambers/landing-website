import { defineSchema } from 'tinacms';

// Placeholder schema - This needs to be populated with actual content models
// based on the website structure (e.g., pages, team, practice areas, blog).
// See TinaCMS documentation: https://tina.io/docs/schema/
const schema = defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'mdx', // Example format
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
          isTitle: true,
          required: true,
        },
        {
          type: 'rich-text',
          label: 'Blog Post Body',
          name: 'body',
          isBody: true,
        },
        {
          label: 'Published Date',
          name: 'published',
          type: 'datetime',
        },
        {
           label: 'Author',
           name: 'author',
           type: 'string', // Could be a reference to a 'team' collection later
        }
        // Add other fields like cover image, tags, etc.
      ],
    },
    // --- Example Page Collection ---
    // {
    //   label: 'Pages',
    //   name: 'page',
    //   path: 'content/pages',
    //   format: 'json', // Or MDX if content is primarily markdown
    //   fields: [
    //     {
    //       type: 'string',
    //       label: 'Title',
    //       name: 'title',
    //       isTitle: true,
    //       required: true,
    //     },
    //     {
    //        label: 'Sections',
    //        name: 'sections',
    //        type: 'object',
    //        list: true,
    //        templates: [
    //          // Define templates for different page sections (Hero, Text, CTA etc.)
    //          // See: https://tina.io/docs/reference/templates/
    //        ]
    //     }
    //   ],
    // },
    // --- Add collections for Team, Practice Areas, Careers etc. ---
  ],
});

export default schema;
