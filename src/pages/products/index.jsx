import React, { useEffect, useState } from "react";
import { GlobalTable } from '@components'
import { products } from '@service'

const Index = () => {
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const res = await products.get()
            if (res.status === 200) {
                setData(res?.data?.data?.products)
                console.log(data);
                console.log(res?.data?.data?.products)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
    ]

    return (
        <>
            <GlobalTable data={data} columns={columns} />
        </>
    )
}

export default Index