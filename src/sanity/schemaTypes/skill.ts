import { defineField, defineType } from 'sanity'

export const skill = defineType({
    name: 'skill',
    title: 'Skill',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Skill Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Frontend', value: 'frontend' },
                    { title: 'Backend', value: 'backend' },
                    { title: 'Tools', value: 'tools' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'image',
            title: 'Icon',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
