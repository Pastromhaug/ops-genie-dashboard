/**
 * Created by perandre on 5/2/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import YouTube from 'react-youtube'
import Card from 'material-ui/Card'



const styles = {
    container: {
        color: 'red',
        backgroundColor: 'green'
    }
};

const itemstyles = {
    container: {
        backgroundColor: 'yellow',
        padding: '16px'
    }
};

const appbarstyle = {
    container: {
        margin: '0px',
        marginLeft: '256px'
    }
};

const avatarstyle = {
    container: {
        margin: '50px'
    }
};

const cardstyle = {
    container: {
        marginLeft: '272px',
        marginRight: '16px',
        marginTop: '10px',
        padding: '16px'
    }
};

const playerstyle = {
    container: {
        margin: 'auto'
    }
};


class Content extends React.Component{
    render() {
        return(
            <div>
                <div style={styles.container}>
                    <Drawer open={true}>
                        <Avatar style={avatarstyle.container} size={60}/>
                        <div>
                            <List subheader="Lecture Videos">
                                <ListItem primaryText="Sent mail"  />
                                <ListItem primaryText="Drafts" />
                                <ListItem
                                    primaryText="Inbox"
                                    primaryTogglesNestedList={true}
                                    nestedItems={[
                                    <ListItem
                                        key={1}
                                        primaryText="Starred"
                                    />,
                                    <ListItem
                                        key={2}
                                        primaryText="Sent Mail"
                                        nestedItems={[
                                        <ListItem
                                            key={1} primaryText="Drafts"
                                        />
                                        ]}
                                    />
                                    ]}
                                />
                            </List>
                        </div>
                    </Drawer>
                </div>
                <AppBar style={appbarstyle.container} showMenuIconButton={false}
                    title="Change The World"
                />
                <Card style={cardstyle.container}>
                    <YouTube style={playerstyle.container}
                        videoId={'vC8gJ0_9o4M'}/>
                </Card>
            </div>
        )
    };
}

export default Content;