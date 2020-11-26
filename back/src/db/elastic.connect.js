import elastic from '@elastic/elasticsearch'

// curl "localhost:9200/_cat/indices?v
export default new elastic.Client({ node: 'http://localhost:9200' })
