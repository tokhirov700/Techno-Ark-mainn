import React, { useEffect, useState } from "react";
import { Button, Input, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable } from '@components';
import { CategoriesModal } from '@modals';
import { category } from '@service';
import { ConfirmDelete } from '@confirmation';

const Index = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [update, setUpdate] = useState({});
    const [total, setTotal] = useState();
    const navigate = useNavigate();
    const { search } = useLocation();
    const [params, setParams] = useState({
        search: "",
        limit: 2,
        page: 1
    });

    useEffect(() => {
        const params = new URLSearchParams(search);
        let page = Number(params.get("page")) || 1;
        let limit = Number(params.get("limit")) || 2;
        setParams((prev) => ({
            ...prev,
            limit: limit,
            page: page,
        }));
    }, [search]);

    // ============ Table ==============
    const handleTableChange = (pagination) => {
        const { current, pageSize } = pagination;
        setParams((prev) => ({
            ...prev,
            limit: pageSize,
            page: current,
        }));
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", `${current}`);
        searchParams.set('limit', `${pageSize}`);
        navigate(`?${searchParams}`);
    };

    //  ============ Modal ===========
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleClose = () => {
        setIsModalOpen(false);
        setUpdate({});
    };

    // ============ get Data ============
    const getData = async () => {
        try {
            const res = await category.get();
            if (res.status === 200) {
                setData(res?.data?.data?.categories);
                setTotal(res?.data?.data?.count);
                console.log(res.data.data.categories, "data"); // Fixed logging to fetch updated data
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, [params]);

    // =========== edit Data ===========
    const editData = (item) => {
        setUpdate(item);
        showModal();
        console.log(item);
    };

    // ======== delete Data ========= 
    const deleteData = async (id) => {
        const res = await category.delete(id);
        if (res.status === 200) {
            getData();
        }
    };

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
        },
        {
            title: 'Category name',
            dataIndex: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => editData(record)}><EditOutlined /></Button>
                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Brand?"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <CategoriesModal
                visible={isModalOpen}
                handleClose={handleClose}
                getData={getData}
                update={update}
            />
            <div className="flex items-center justify-between py-4">
                <Input placeholder="Search Categories" size="large" style={{ maxWidth: 260, minWidth: 20 }} />
                <div className="flex gap-2 items-center ">
                    <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 20, backgroundColor: "orangered" }} onClick={showModal}>
                        Create
                    </Button>
                </div>
            </div>
            <GlobalTable
                data={data}
                columns={columns}
                handleChange={handleTableChange}
                pagination={{
                    current: params.page,
                    pageSize: params.limit,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '3', '4', '6']
                }}
            />
        </>
    );
};

export default Index;
