import  { useEffect, useState } from "react";
import { GlobalTable } from '@components';
import { products } from '@service';
import { Drawer, Button, Form, Input } from 'antd';

const Index = () => {
    const [data, setData] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
    const [form] = Form.useForm(); 

    const getData = async () => {
        try {
            const res = await products.get();
            if (res.status === 200) {
                setData(res?.data?.data?.products);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const onClose = () => {
        setIsDrawerOpen(false);
        form.resetFields(); 
    };

    const onFinish = async (values) => {
        try {
            const res = await products.create(values); 
            if (res.status === 200) {
                getData(); 
                onClose(); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between py-4">
                <Input placeholder="Search Categories" size="large" style={{ maxWidth: 260, minWidth: 20 }} />
                <div className="flex gap-2 items-center">
                    <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 20, backgroundColor: "orangered" }} onClick={showDrawer}>
                        Create
                    </Button>
                </div>
            </div>

            <Drawer
                title="Create a new product"
                width={660}
                onClose={onClose}
                open={isDrawerOpen}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                        <Form.Item
                            name="name"
                            label="Product Name"
                            rules={[{ required: true, message: 'Please enter product name!' }]}
                            style={{ width: '100%'  }}
                        >
                            <Input style={{padding: '10px', fontSize: '16px'}} placeholder="Enter product name" />
                        </Form.Item>
                        <Form.Item
                            name="category_id"
                            label="Product Category"
                            rules={[{ required: true, message: 'Please enter product category!' }]}
                            style={{ width: '100%' }}
                        >
                            <Input style={{padding: '10px' , fontSize: '16px'}} placeholder="Enter product category" />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: '#e35112' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>

            {/* GlobalTable */}
            <GlobalTable data={data} columns={columns} />
        </>
    );
};

export default Index;
