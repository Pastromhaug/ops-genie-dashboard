/**
 * Created by perandre on 5/2/16.
 */

import React from 'react';
import {Layout, Header, Content, Drawer, Navigation} from 'react-mdl/lib/Layout';
import Textfield from 'react-mdl/lib/Textfield';



class MainLayout extends React.Component {

    render() {
        return (
            <div style={{height: '300px', position: 'relative'}}>
                <Layout fixedHeader fixedDrawer>
                    <Header title="Eyyyyy">
                        <Textfield
                            value=""
                            onChange={() => {}}
                            label="Search"
                            expandable
                            expandableIcon="search"
                        />
                    </Header>
                    <Drawer title="Title">
                        <Navigation>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </Navigation>
                    </Drawer>
                    <Content />
                </Layout>
            </div>
        )
    };
}

export default MainLayout;