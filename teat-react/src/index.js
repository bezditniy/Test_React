import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import './scss/index.scss'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
    query GetQuery {
      category{
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            items {
              id
              value
              displayValue
            }
            type
          }
          prices {
            currency {
              symbol
              label
            }
            amount
          }
          brand
        }
      }
      currencies {
        label
        symbol
      }
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            name
            id
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            amount
            currency {
              label
              symbol
            }
          }
          brand
        }
      }
    }
    `,
  })
  .then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>   
    </Router>
  </React.StrictMode>
  
);

