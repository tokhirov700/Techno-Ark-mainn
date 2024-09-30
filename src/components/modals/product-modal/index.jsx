
import { Modal, Form, Input, Button, Select, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { brandCategory } from '@service';
const { Option } = Select;

const Index = ({ open, onClose, update, getData, brand, categories, brandCategories }) => {
    const [form] = Form.useForm();
    const [filteredBrands, setFilteredBrands] = useState([])
    const [filteredBrandCat, setFilteredBrandCat] = useState([])

    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update?.name || "",
                price: parseInt(update?.price) || "",
                category_id: parseInt(update?.category_id) || "",
                brand_category_id: parseInt(update?.brand_category_id) || "",
                brand_id: parseInt(update?.brand_id) || "",
                files: ""
            })
        } else {
            form.resetFields()
        }
    });

    //========= filter brands ============

    const handleCategoryChange = (category_id) => {
        const relatedBrands = brand?.filter((item => item.category_id === category_id))
        setFilteredBrands(relatedBrands)

    }

    //========= filter category brands ============

    const handleBrandChange = (brand_id) => {
        const relatedBrandCategories = brandCategories?.filter((item => item.brand_id === brand_id))
        setFilteredBrandCat(relatedBrandCategories)
    }



    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            if (update?.id) {
                await brandCategory.update(update.id, values);
                console.log(update);
                handleClose()
                getData()
            } else {
                await brandCategory.create(values);
                getData()
                handleClose()
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Drawer onClose={onClose} open={open} width={600}>
                <h2 className='text-[24px] font-semibold my-3'>Add Product</h2>

                <Form
                    form={form}
                    name="brands_form"
                    style={{ display: "flex", flexDirection: "column", }}
                    onFinish={onFinish}

                >
                    <div className='flex gap-3 '>
                        <Form.Item
                            label="Product name"
                            name="name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product name!' },
                            ]}
                        >
                            <Input style={{ height: "40px" }} />
                        </Form.Item>
                        <Form.Item
                            label="Product price"
                            name="price"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product price!' },
                            ]}
                        >
                            <Input style={{ height: "40px" }} type='number' />
                        </Form.Item>
                    </div>
                    <div className='flex gap-3 mb-5'>
                        <Form.Item
                            name="categoryId"
                            label=" Select Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px', height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select category!' },
                            ]}

                        >
                            <Select
                                showSearch
                                style={{ height: "40px" }}
                                onChange={handleCategoryChange}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {categories?.map((item, index) => (
                                    <Option value={parseInt(item.id)} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="brand_id"
                            label="Select Brand"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select Brand!' },
                            ]}
                        >
                            <Select
                                style={{ height: "40px" }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleBrandChange}
                            >
                                {filteredBrands?.map((item, index) => (
                                    <Option value={parseInt(item.id)} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </div>
                    <div className='flex gap-3 mb-5 mt-4' >
                        <Form.Item
                            name="brand_category_id"
                            label="Select Brand  Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select Brand category!' },
                            ]}
                        >
                            <Select
                                style={{ height: "40px" }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleBrandChange}
                            >
                                {filteredBrandCat?.map((item, index) => (
                                    <Option value={parseInt(item.id)} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="file"
                            label="File"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            // style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Upload file!' },
                            ]}>
                            <input type="file" height={80} />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            block
                            type="submit"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#e35112",
                                color: "white",
                                height: "40px",
                                fontSize: "18px",
                                marginTop: "10px",
                            }}
                        >
                            Add
                        </Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </>
    );
};

export default Index;