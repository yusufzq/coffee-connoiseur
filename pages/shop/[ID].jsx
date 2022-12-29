import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { shopsGet } from '../../services/shops';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from '../../styles/shop.module.css';

export async function getStaticPaths() {
	const shops = await shopsGet();
	const paths = shops.map(({ ID }) => ({
		params: {ID: ID.toString()}
	}));
	
	return {
		paths,
		fallback: true
	};
};

export async function getStaticProps({ params }) {
	const shops = await shopsGet(); 
	const shop = shops.find(({ ID }) => ID.toString() === params.ID);
		
	return {
		props: {...shop}
	};
};

const Shop = ({ name, address, neighbourhood, imageURL }) => {
	const router = useRouter();
	
	if (router.isFallback) {
		return <h1>Loading...</h1>
	};
	
	const onUpVoteButtonClick = () => {
		console.log('CLICK');
	};
	
	return (
		<>
			<Head>
				<title>{name}</title>
			</Head>
			<main className={classNames(styles.layout, styles.container)}>
				<section className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href='/'>← Home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image src={imageURL} alt={name} className={styles.shopImg} width={600} height={360} />
				</section>
				<section className={classNames('glass', styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image src='/icons/places.svg' alt='places icon' width={24} height={24} />
						<p className={styles.text}>{address}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src='/icons/locationArrow.svg' alt='location arrow icon' width={24} height={24} />
						<p className={styles.text}>{neighbourhood}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src='/icons/star.svg' alt='star icon' width={24} height={24} />
						<p className={styles.text}>7</p>
					</div>
					<button className={styles.upvoteButton} onClick={onUpVoteButtonClick}>UpVote</button>
				</section>
			</main>
		</>
	);
};

export default Shop;