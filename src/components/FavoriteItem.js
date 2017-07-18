import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PersonIcon from 'react-icons/lib/md/person';
import ImmutablePropTypes from 'react-immutable-proptypes';


const FavoriteItem = ( {contact} ) => {
    const { color, name, phone } = contact.toJS();
    return (
        <Wrapper>
            <Box color={color}>
                <ThumbnailContainer>
                    <PersonIcon />
                </ThumbnailContainer>
                <Info>
                    <Name>{name}</Name>
                    <Phone>{phone}</Phone>
                </Info>
            </Box>
        </Wrapper>
    )
};

FavoriteItem.propTypes = {
    contact: ImmutablePropTypes.mapContains({
        id: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string,
        color: PropTypes.string,
        favorite: PropTypes.bool
    })
};

export default FavoriteItem;