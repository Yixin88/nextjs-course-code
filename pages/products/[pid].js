import path from 'path';
import fs from 'fs/promises'


import React from 'react'

export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  return data;
}


export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid

  const data = await getData();

  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return {
      notFound: true //When the url doesn't exist, it will goto not found page after fallback html
    }
  }

  return {
    props: {
      loadedProduct: product
    }
  }

}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(product => product.id);

  const pathsWithParams = ids.map(id => ({params: {pid: id}}))

  return {
    paths: pathsWithParams
      // { params: {pid: 'p2'}}, //should only have pages thats popular here rather than all pages
      // { params: {pid: 'p3'}},
    ,
    fallback: true // using fallback means telling next js to not pre render this page to optimize speed, and only generate the pages in paths (popular pages)
    //However using fall back true, we need to have a fall back html in a if statement above e.g. loading...
    //Can also use 'blocking' so we don't need fallback HTML and just return the finished page
  }
}