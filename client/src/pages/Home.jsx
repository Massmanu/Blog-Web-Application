// src/pages/Home.jsx
import React from 'react';
import { Title, Text, Button, Box, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <Box
            sx={(theme) => ({
                padding: theme.spacing.xl,
                backgroundColor: theme.white,
                borderRadius: theme.radius.md,
                boxShadow: theme.shadows.sm,
            })}
        >
            <Group position="apart" mb="md">
                <Title
                    order={2}
                    sx={(theme) => ({
                        color: theme.colors.teal[7],
                    })}
                >
                    Welcome to My Blog
                </Title>


            </Group>

            <Text mb="lg">
                Read the latest posts from our community{' '}
                <Link to="/blogs">
                    <Button variant="outline" color="teal" ml="sm">
                        See all Posts
                    </Button>
                </Link>, or{' '}
                <Link to="/new">
                    <Button variant="outline" color="teal" ml="sm">
                        Create a Post
                    </Button>
                </Link>

            </Text>
            <Button variant="light" color="red" onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
}
