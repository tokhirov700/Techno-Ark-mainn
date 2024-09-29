import { Modal, Form, Input, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { brands } from '@service';
const { Option } = Select;

const Index = ({ visible, onOk, handleClose, update, getData, categories }) => {
    const [form] = Form.useForm();  

    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update?.name || "",
                description: update?.description || "",
                category_id: update?.category_id || "",
                file: update?.file || "",
            });
        } else {
            form.resetFields();
        }
    }, [update, form]);  

    const [file, setFile] = useState({});
    const handleChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file);
    };

    const onFinish = async (value) => {
        console.log('Received values of form: ', value);
        let formData = new FormData();
        formData.append("name", value.name);
        formData.append("category_id", value.category_id);
        formData.append("description", value.description);
        formData.append("file", file);
        try {
            if (update?.id) {
                await brands.update(update.id, formData);
                console.log(update);
                handleClose();
                getData();
            } else {
                await brands.create(formData);
                getData();
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title="Add New Brand"
            open={visible}
            onOk={onOk}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form} 
                name="brands_form"
                style={{ display: "flex", flexDirection: "column" }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Brand name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        { required: true, message: 'Enter Brand name!' },
                    ]}
                >
                    <Input style={{ height: "40px" }} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        { required: true, message: 'Enter Description!' },
                    ]}
                >
                    <Input style={{ height: "40px" }} />
                </Form.Item>

                <Form.Item
                    name="category_id"
                    label="Category"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        { required: true, message: 'Enter Brand name!' },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a Category"
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
                    name="file"
                    label="File"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        { required: true, message: 'Upload file !' },
                    ]}>
                    <input type="file" onChange={handleChange} />
                </Form.Item>

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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Index;
