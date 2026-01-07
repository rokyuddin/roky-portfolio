import { type SchemaTypeDefinition } from 'sanity'
import { profile } from './profile'
import { skill } from './skill'
import { experience } from './experience'
import { project } from './project'
import { testimonial } from './testimonial'
import { post } from './post'
import { caseStudy } from './caseStudy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    skill,
    experience,
    project,
    testimonial,
    post,
    caseStudy
  ],
}
