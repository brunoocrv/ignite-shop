import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import axios from "axios";
import Head from "next/head";

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";

import { stripe } from "@/lib/stripe";


interface ProductProps {
	product: {
		id: string;
		name: string;
		imageUrl: string;
		price: string;
		description: string;
		defaultPriceId: string;
	}
}


export default function Product({ product }: ProductProps) {
	const [isCreatingCheckoutSession, setCreatingCheckoutSession] = useState(false)

	const handleBuy = async () => {
		try {
			setCreatingCheckoutSession(true)

			const response = await axios.post('/api/checkout', {
				priceId: product.defaultPriceId
			})

			const { checkoutUrl } = response.data

			window.location.href = checkoutUrl
		} catch (error) {

			setCreatingCheckoutSession(false)
			alert('Falha ao redirecionar ao checkout')
		}
	}

	return (
		<>
			<Head>
				<title>{product.name} | Ignite Shop</title>
			</Head>
			<ProductContainer>
				<ImageContainer>
					<Image 
						src={product.imageUrl} 
						alt=""
						width={520}
						height={480}
					/>
				</ImageContainer>
				<ProductDetails>
					<h1>{product.name}</h1>
					<span>{product.price}</span>

					<p>{product.description}</p>
					<button onClick={handleBuy} disabled={isCreatingCheckoutSession}>Comprar</button>
				</ProductDetails>
			</ProductContainer>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{ params: { id: ''} }
		],
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
	const productId = params!.id

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price']
	})

	const price = product.default_price as Stripe.Price

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}).format(price.unit_amount! / 100),
				description: product.description,
				defaultPriceId: price.id
			}
		},
		revalidate: 60 * 60 //1 hour
	}
}