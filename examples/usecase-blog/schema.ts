import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { select, relationship, text, timestamp } from '@keystone-6/core/fields';
import { Lists } from '.keystone/types';

export const lists: Lists = {
  Post: list({
    access: allowAll,
    ui: {
      searchFields: ['title', 'content'],
    },
    fields: {
      title: text({ validation: { isRequired: true },ui:{description:`
      desc1
      desc2` }}),
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ],
      }),
      content: text(),
      publishDate: timestamp(),
      author: relationship({ ref: 'Author.posts', many: false }),
    },
  }),
  Author: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
};
