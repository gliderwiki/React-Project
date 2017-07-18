import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import StarIcon from 'react-icons/lib/md/star';
import EditIcon from 'react-icon/lib/md/edit';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ContactItem extends Component {
    static propTypes = {
        contact: ImmutablePropTypes.mapContains({
            id: PropTypes.string,
            name: PropTypes.string,
            phone: PropTypes.string,
            color: PropTypes.string,
            favorite: PropTypes.bool
        }),
        onToggleFavorite: PropTypes.func,
        onOpenModify: PropTypes.func
    }

    render() {
        const {
            contact,
            onOpenModify,
            onToggleFavorite
            } = this.props;

        const { name, phone, favorite, id, color } = contact.toJS();

        return (
            <Wrapper>
                <Thumbnail color={color} />
                <Info>
                    <Name>{name}</Name>
                    <Phone>{name}</Phone>
                </Info>

                <div className="actions">
                    <CircleButton className="favorite" action={favorite} onClick={() => onToggleFavorite(id)}>
                        <StarIcon />
                    </CircleButton>
                    <CircleButton onClick={() => onOpenModify(id)}>
                        <EditIcon />
                    </CircleButton>
                </div>
            </Wrapper>
        );
    }
}

export default ContactItem;
