import React from "react";
import { Flex, Box } from "reflexbox"
import LogoutButton from "../LogoutButton"

class Navigation extends React.Component {
    render() {
        return (
            <div id="navbar">
                <Flex
                    justify="flex-end"
                    style={{ width: '100%'}}
                >
                    <Box>
                        <LogoutButton />
                    </Box>
                </Flex>
            </div>
        )
    }
};

export default Navigation;
