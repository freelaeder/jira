import React, {useState} from "react";
import {Divider, List, Popover, Typography} from "antd";
import styled from "@emotion/styled";
import {useUsers} from "utils/user";
import {useNavigate} from "react-router-dom";

export const UserPopover = () => {
    const {data: users, refetch} = useUsers();
    const navigate = useNavigate()
    // 控制显示隐藏
    const [show,setShow] = useState(false)
    const content = (
        <ContentContainer>
            <Typography.Text type={"secondary"}>组员列表</Typography.Text>
            <List>
                {users?.map((user) => (
                    <List.Item onClick={() => {navigate(`/personal/${user.name}`);setShow(false)}} key={user.id}>
                            <List.Item.Meta title={user.name}  />
                    </List.Item>
                ))}
            </List>
            <Divider/>
        </ContentContainer>
    );

    return (
        <Popover
            onOpenChange={() => {refetch();setShow(!show)}}
            placement={"bottom"}
            content={content}
            open={show}
        >
            <span>组员</span>
        </Popover>
    );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
