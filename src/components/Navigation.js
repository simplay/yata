import React from "react";
import { observer, inject } from "mobx-react";
import { Flex, Box } from "reflexbox"
import LogoutButton from "./LogoutButton"

class Navigation extends React.Component {
    render() {
        const navbarStyle = {
            backgroundColor: "#1b1c1d",
            paddingRight: "10px",
            paddingLeft: "10px",
            color: "white",
            gridArea: "header",
            display: "grid",
            boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.7)",
            height: 40
        };

        return (
            <div
                id="navbar"
                style={navbarStyle}
            >
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
