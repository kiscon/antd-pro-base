import { message } from 'antd';

const ShowMsg = (msg, type = 'warning') => {
  message.destroy();
  message[type](msg);
}

export default ShowMsg;
