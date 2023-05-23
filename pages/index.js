import path from 'path';
import fs from 'fs/promises'
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  console.log('Regenerating')

  if (!data) {
    return {
      redirect: {
        destination: '/no-data' //if there is no data, we can redirect to another page such as no-data page instead of generating the html above
      }
    }
  }

  if (data.products.length === 0) {
    return {
      notFound: true //if there is no data in the array, it will send to 404 page instead
    }
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10 //regenerate the page after 10 seconds on production code
  }
}

export default HomePage;
