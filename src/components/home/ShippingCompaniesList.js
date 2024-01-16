import React from 'react';
import { AppList, AppView } from '../../common';
import ShippingCompaniesCard from './ShippingCompaniesCard';
import { BASE_URL } from '../../api/utils/urls';

const ShippingCompaniesList = ({ setTotalCompanies }) => {

    return (
        <AppView flex stretch center >
            <AppList
                //   refreshControl={}
                flex
                apiRequest={{
                    url: `${BASE_URL}companies`,
                    responseResolver: (response) => {
                        const { meta, data } = response?.data;
                        setTotalCompanies(data.length)
                        return {
                            data: data || [],
                            // pageCount: Math.ceil(meta?.total / meta?.per_page),
                            // page: meta?.current_page,
                        };
                    }
                }}
                stretch
                horizontal
                rowRenderer={(data) => (
                    <ShippingCompaniesCard  {...data} />
                )}
            />
        </AppView>
    );
};

export default ShippingCompaniesList;
