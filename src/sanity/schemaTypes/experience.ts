import { defineField, defineType } from 'sanity'

export const experience = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'period',
            title: 'Period',
            type: 'string',
            description: 'e.g., "Sep 2022 – Present"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tech',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
