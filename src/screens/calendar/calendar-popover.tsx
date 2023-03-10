import React from 'react';
import {Image, Popover} from "antd";
import {useNavigate} from "react-router-dom";

const CalendarPopover = () => {
    const content = (
        <div>
            {/*<Typography.Text type={'secondary'}>日历缩略图</Typography.Text>*/}
            <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        </div>
    )
   const navigate = useNavigate()
    return (
        <Popover
            placement={"bottom"}
            content={content}>
            <span onClick={() => navigate('calendar')}>日历</span>
        </Popover>
    );
};

export default CalendarPopover;