import React, {useEffect, useState} from 'react';
import {useRouteType} from "../project";
import styled from "@emotion/styled";
import {Card, notification, Tag} from "antd";
import {PersonInfoBox} from "./person-infobox";
import {ArrowRightOutlined} from '@ant-design/icons';

const {Meta} = Card;
const PersonalDisplay = () => {
    // 当前页面的用户名
    const userName = decodeURIComponent(useRouteType())
    //计数器--鼠标移入计数
    const [count, setCount] = useState(0)
    // notification content
    const [desc, setDesc] = useState('不妨试试点击卡片')
    // 是否展示详细信息box
    const [boxShow, setBoxShow] = useState(false)
    // 路由
    useEffect(() => {
        if (count >= 5) {
            setDesc('别再玩了，我也是有脾气的')
        }

    }, [count])
    const openNotification = () => {
        if (count <= 5) {
            notification.open({
                message: 'Notification Title',
                description: desc,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }

    };


    return (
        <PersonContainer>
            <h1 style={{width: 'fit-content'}} onMouseLeave={() => setCount(c => c + 1)}
                onMouseOver={openNotification}>{userName}</h1>

            <div className={'personInfoContainer'}>
                <Card
                    onClick={() => setBoxShow(!boxShow)}
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com"/>
                </Card>
                {
                    boxShow ? (<>
                        <PersonInfoBox/>
                        <Tag  style={{display:'block',alignSelf:'center',width:'70px',height:'25px',lineHeight:'23px',fontSize:'10px',}} icon={<ArrowRightOutlined />} color="success">
                            end
                        </Tag>
                    </>) : null
                }

            </div>
        </PersonContainer>
    );
};

export default PersonalDisplay;

const PersonContainer = styled.div`
  margin: auto;
  height: 790px;
  padding-top: 38px;

  .personInfoContainer {
    display: flex;
  }

`