import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles, Typography } from '@material-ui/core'
import categoryApi from 'api/categoryApi'

const useStyle = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            marginTop: theme.spacing(1),

            '&:hover': {
                color: theme.palette.primary.dark,
                transition: 'all .25s',
                cursor: 'pointer',
            },
        },
    },
}))

const FilterByCategory = ({ onChange }) => {
    const [categoryList, setCategoryList] = useState([])
    const classes = useStyle()

    useEffect(() => {
        ;(async () => {
            try {
                const listCategory = await categoryApi.getAll()
                setCategoryList(
                    listCategory.map(x => ({
                        id: x.id,
                        name: x.name,
                    })),
                )
                console.log(listCategory)
            } catch (error) {
                console.log('Failed to fetch category list ', error.message)
            }
        })()
    }, [])

    const handleCategoryClick = category => {
        if (onChange) {
            onChange(category.id)
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
            <ul className={classes.menu}>
                {categoryList.map(category => (
                    <li key={category.id} onClick={() => handleCategoryClick(category)}>
                        <Typography variant="body2">{category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    )
}

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
}

export default FilterByCategory
