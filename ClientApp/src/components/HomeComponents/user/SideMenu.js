import { Menu, Button } from 'antd';
import React, { Component} from 'react'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class SideMenu extends Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        ALL ITEMS
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        TRANSACTION
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                        SHIPPING
                    </Menu.Item>

                    <Menu.Item key="4" icon={<ContainerOutlined />}>
                        VIEW
                    </Menu.Item>
                   
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="ITEMS">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                       
                    </SubMenu>


                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="TRANSACTIONS">
                        <Menu.Item key="13">Option 9</Menu.Item>
                        <Menu.Item key="14">Option 10</Menu.Item>
                        
                    </SubMenu>

                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="SHIPPINGS">
                        <Menu.Item key="13">Option 9</Menu.Item>
                        <Menu.Item key="14">Option 10</Menu.Item>

                    </SubMenu>


                </Menu>
            </div>
        );
    }
}
