import React, {useState} from 'react';
import styled from "@emotion/styled";
import CalendarContainer from "./calendar";
import {Affix, Button} from "antd";
import ProListScreen from "../prolist";

const CalendarScreen = () => {
    const [top] = useState(85);
    const [screenStatus, setScreenStatus] = useState(true)
    return (
        <>
            <Affix style={{width: 100, left: '15%'}} offsetTop={top}>
                <Button style={{left:'170px'}} type="primary" onClick={() => setScreenStatus(!screenStatus)}>
                    {screenStatus ? '切换列表' : '切换日历'}
                </Button>
            </Affix>
            <CalendarScreenContainer>
                {
                    screenStatus ? <CalendarContainer/> : <ProListScreen/>
                }

            </CalendarScreenContainer>
        </>

    );
};

export default CalendarScreen;

const CalendarScreenContainer = styled.div`
  margin: auto;
  width: 890px;
  height: 790px;
  padding-top: 38px;

  .events {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .events .ant-badge-status {
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .notes-month {
    font-size: 28px;
    text-align: center;
  }

  .notes-month section {
    font-size: 28px;
  }

`