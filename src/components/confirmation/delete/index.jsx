
import { Popconfirm, Button } from 'antd';
import { DeleteOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons';
const PopconfirmDelete = ({ onConfirm, onCancel, id ,title}) => (
    <Popconfirm
        title={title}
        okText="Ok"
        cancelText="Cancel"
        onConfirm={() => onConfirm(id)}  
        onCancel={onCancel}
    >
        <Button danger><DeleteOutlined/></Button>
    </Popconfirm>
);

export default PopconfirmDelete;
