import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { category } from '@service';

const CategoriesModal = ({ visible, handleClose, update, getData }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update.name,
            });
        } else {
            form.resetFields();
        }
    }, [update]); // Ensure to add update as a dependency

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            if (update?.id) {
                await category.update(update.id, values); // Correctly pass values
                handleClose();
                getData();
            } else {
                await category.create(values);
                getData();
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title="Add New Category"
            open={visible}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="category_form"
                style={{ display: "flex", flexDirection: "column" }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[{ required: true, message: 'Enter category name!' }]}
                >
                    <Input style={{ height: "40px" }} />
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

export default CategoriesModal;
