import React from 'react';
import { Pagination, Icon } from 'semantic-ui-react'

const TeamListsPagination = ({ activePage, totalPages, setActivePage, setLoading }) => {
    const pageChange = (e, { activePage }) => {
        setActivePage(activePage);
        setLoading(true);
    };

    return (
        <Pagination
            activePage={activePage}
            onPageChange={pageChange}
            totalPages={totalPages}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            firstItem={{ content: <Icon name="angle double left" />, icon: true }}
            lastItem={{ content: <Icon name="angle double right" />, icon: true }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            pointing
            secondary
        />
    );
}

export default TeamListsPagination;
