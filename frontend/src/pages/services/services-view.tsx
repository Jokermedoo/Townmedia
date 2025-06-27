import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/services/servicesSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const ServicesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { services } = useAppSelector((state) => state.services)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View services')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View services')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/services/services-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ServiceName</p>
                    <p>{services?.name}</p>
                </div>

                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Price</p>
                  <p>{services?.price || 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Currency</p>
                    <p>{services?.currency ?? 'No data'}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Orders Service</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>OrderDate</th>

                                <th>Status</th>

                            </tr>
                            </thead>
                            <tbody>
                            {services.orders_service && Array.isArray(services.orders_service) &&
                              services.orders_service.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/orders/orders-view/?id=${item.id}`)}>

                                    <td data-label="order_date">
                                        { dataFormatter.dateTimeFormatter(item.order_date) }
                                    </td>

                                    <td data-label="status">
                                        { item.status }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!services?.orders_service?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/services/services-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

ServicesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default ServicesView;
