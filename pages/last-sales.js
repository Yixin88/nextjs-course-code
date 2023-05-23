import React, { useEffect, useState } from "react";
import useSWR from 'swr'

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("https://nextjs-course-4ba9d-default-rtdb.firebaseio.com/sales.json", fetcher);

  useEffect(() => {
    if (data) {
      const transformedArray = [];

      for (const key in data) {
        transformedArray.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedArray)
    }
  }, [data])

  if (error) {
    return <p>Failed to load.</p>
  }

  if (!data && !sales) {
    return (
      <p>Loading...</p>
    )
  }


  return <ul>{sales.map(sale => <li key={sale.id}>{sale.username} - £{sale.volume}</li>)}</ul>;
}


export async function getStaticProps() {
  const response = await fetch("https://nextjs-course-4ba9d-default-rtdb.firebaseio.com/sales.json")
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {sales: transformedSales},  /////This is passed to the normal react code at the top, so now we can use non-pre render code with render code
    revalidate: 5 ///after 5 seconds, if theres an update from the database, it will update the normal react code
  }
}