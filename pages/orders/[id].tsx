import type { NextPage, GetServerSideProps } from 'next'

interface Props {
	order: Order
}

interface Order {
	orderId: string;
	name: string;
	quantity: number;
	price: number;
	delivered: string;
	trackingNumber: string;
	trackingCompany: string;
}

const Order: NextPage<Props>  = (props) => {
	const { order: {name, price, quantity, trackingNumber, trackingCompany, delivered} } = props

  return (
    <div className='flex justify-center mt-10'>
			<div className='w-80 h-80 bg-white rounded-md px-4 py-8'>
				<h1 className="text-3xl font-bold underline ">
					{name}
				</h1>
				<ul>
					<li>Price: ${price}</li>
					<li>Quantity: {quantity}</li>
					<li>Status: {delivered}</li>
					<li>Tracking #: {trackingNumber}</li>
					<li>Tracking Company: {trackingCompany}</li>
				</ul>
			</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;
	const data = await fetch(`https://njaovpicbe.execute-api.us-east-2.amazonaws.com/prod/order?orderId=${params?.id}`)
	const order = await data.json();
	return {
		props: {
			order: order[0]
		},
	};
}

export default Order
