import { SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author'
import category from './category'
import blockContent from './blockContent'
import jobPosting from './jobPosting'

export const schemaTypes: SchemaTypeDefinition[] = [post, author, category, blockContent, jobPosting]
