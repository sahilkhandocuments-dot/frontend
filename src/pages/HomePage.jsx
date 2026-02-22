import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import PublicLayout from '../components/layout/PublicLayout';
import EventGrid from '../components/events/EventGrid';
import EventModal from '../components/events/EventModal';
import { FiSearch, FiArrowRight, FiMusic, FiCalendar, FiTrendingUp, FiFilter, FiX } from 'react-icons/fi';
import { mockEvents } from '../data/mockData';

// Helper function to format date
const formatDate = (dateString) => {
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	} catch (e) {
		return 'TBA';
	}
};

const HeroSection = ({ onSearch, searchTerm }) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2, delayChildren: 0 }
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring' } }
	};

	const floatingVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, type: 'spring' }
		},
		float: {
			y: [-20, 20, -20],
			transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
		}
	};

	return (
		<section className="relative py-20 md:py-32 overflow-hidden">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 -z-10">
				<motion.div
					className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
					animate={{ 
						x: [0, 50, 0], 
						y: [0, 30, 0],
						scale: [1, 1.1, 1]
					}}
					transition={{ duration: 8, repeat: Infinity }}
				/>
				<motion.div
					className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
					animate={{ 
						x: [0, -50, 0], 
						y: [0, -30, 0],
						scale: [1, 1.1, 1]
					}}
					transition={{ duration: 10, repeat: Infinity, delay: 1 }}
				/>
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="container mx-auto px-4 text-center"
			>
				{/* Floating Badge */}
				<motion.div
					variants={floatingVariants}
					initial="hidden"
					animate="visible"
					whileInView="float"
					className="inline-block mb-6"
				>
					<div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full px-4 py-2 flex items-center gap-2">
						<FiTrendingUp className="text-primary" />
						<span className="text-sm font-semibold">Discover 500+ Events This Month</span>
					</div>
				</motion.div>

				{/* Main Headline */}
				<motion.h1 
					variants={itemVariants}
					className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
				>
					<span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
						Discover Amazing
					</span>
					<br />
					<span className="text-white">Events Near You</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.p 
					variants={itemVariants}
					className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
				>
					Explore concerts, conferences, sports, and more. Only approved events, carefully curated for the best experience.
				</motion.p>

				{/* Search Bar */}
				<motion.div
					variants={itemVariants}
					className="max-w-2xl mx-auto mb-12"
				>
					<motion.div 
						className="relative group"
						whileHover={{ scale: 1.02 }}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
						<div className="glass-card p-1 rounded-2xl">
							<div className="bg-gradient-to-r from-gray-900 to-gray-900 rounded-xl p-4 flex items-center gap-3">
								<FiSearch size={20} className="text-primary" />
								<input 
									type="text"
									value={searchTerm}
									onChange={(e) => onSearch(e.target.value)}
									placeholder="Search events, concerts, speakers..." 
									className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
								/>
								{searchTerm && (
									<motion.button
										onClick={() => onSearch('')}
										className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<FiX size={20} className="text-gray-400" />
									</motion.button>
								)}
								<motion.button 
									className="bg-gradient-to-r from-primary to-secondary text-black px-6 py-2 rounded-lg font-bold whitespace-nowrap"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Search
								</motion.button>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* CTA Buttons */}
				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row items-center justify-center gap-4"
				>
					<motion.button 
						className="bg-gradient-to-r from-primary to-secondary text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2"
						whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.5)' }}
						whileTap={{ scale: 0.95 }}
					>
						Explore Events <FiArrowRight />
					</motion.button>
					<motion.button 
						className="border-2 border-primary px-8 py-3 rounded-lg font-bold text-primary hover:bg-primary/10 transition-colors"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Create Event
					</motion.button>
				</motion.div>
			</motion.div>
		</section>
	);
};

const StatisticsSection = () => {
	const stats = [
		{ icon: FiMusic, label: 'Events', value: '500+' },
		{ icon: FiCalendar, label: 'Dates', value: '12 Months' },
		{ icon: FiTrendingUp, label: 'Users', value: '50K+' }
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2 }
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
	};

	return (
		<motion.section
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			className="py-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
		>
			{stats.map((stat, i) => {
				const Icon = stat.icon;
				return (
					<motion.div
						key={i}
						variants={itemVariants}
						className="glass-card p-6 rounded-2xl text-center hover:border-primary/50 transition-all"
						whileHover={{ scale: 1.05, y: -10 }}
					>
						<motion.div
							className="text-4xl text-primary mb-3 flex justify-center"
							animate={{ rotate: 360 }}
							transition={{ duration: 4, repeat: Infinity }}
						>
							<Icon size={40} />
						</motion.div>
						<motion.h3
							className="text-2xl font-bold mb-1"
							animate={{ scale: [1, 1.1, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							{stat.value}
						</motion.h3>
						<p className="text-gray-400">{stat.label}</p>
					</motion.div>
				);
			})}
		</motion.section>
	);
};

export default function HomePage(){
	const [selected, setSelected] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const categories = ['All', 'Music', 'Tech', 'Art', 'Sports', 'Comedy', 'Food', 'Other'];

	// Load mock events
	useEffect(() => {
		// Simulate loading delay for better UX
		setLoading(true);
		setTimeout(() => {
			setEvents(mockEvents);
			setLoading(false);
		}, 500);
	}, []);

	// Filter events based on search and category
	const filteredEvents = useMemo(() => {
		try {
			if (!Array.isArray(events)) {
				console.error('Events is not an array:', events);
				return [];
			}
			return events.filter(event => {
				try {
					const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
						event.category?.toLowerCase().includes(searchTerm.toLowerCase());
					const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
					return matchesSearch && matchesCategory;
				} catch (e) {
					console.error('Error filtering event:', event, e);
					return false;
				}
			});
		} catch (e) {
			console.error('Error in filteredEvents memo:', e);
			return [];
		}
	}, [searchTerm, selectedCategory, events]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 }
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	// Error fallback
	if (error) {
		return (
			<PublicLayout>
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Events</h2>
						<p className="text-gray-400">{error}</p>
						<button 
							onClick={() => window.location.reload()} 
							className="mt-4 px-6 py-2 bg-primary text-black rounded-lg"
						>
							Reload Page
						</button>
					</div>
				</div>
			</PublicLayout>
		);
	}

	return (
		<PublicLayout>
			{/* Hero Section */}
			<HeroSection onSearch={setSearchTerm} searchTerm={searchTerm} />

			<div className="container mx-auto px-4">
			{/* Statistics Section */}
			<StatisticsSection />

			{/* Filters Section */}
			<motion.section
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="py-8"
			>
				<div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
					<FiFilter className="text-primary flex-shrink-0" size={20} />
					{categories.map((category) => (
						<motion.button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
								selectedCategory === category
									? 'bg-gradient-to-r from-primary to-secondary text-black'
									: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{category}
						</motion.button>
					))}
				</div>
			</motion.section>

			{/* Featured Events Section */}
			<motion.section
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="py-8"
			>
				<motion.div
					variants={itemVariants}
					className="mb-12"
				>
					<motion.h2
						className="text-4xl md:text-5xl font-bold mb-4"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						{searchTerm || selectedCategory !== 'All' ? 'Search Results' : 'Featured Events'}
						{(searchTerm || selectedCategory !== 'All') && (
							<span className="text-lg text-gray-400 ml-4">({filteredEvents.length} events)</span>
						)}
					</motion.h2>
					<motion.div
						className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded"
						initial={{ width: 0 }}
						whileInView={{ width: 80 }}
						transition={{ duration: 0.8 }}
					/>
				</motion.div>

				{loading ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-20"
					>
						<div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
						<p className="text-xl text-gray-400 mt-4">Loading events...</p>
					</motion.div>
				) : filteredEvents.length > 0 ? (
					<EventGrid events={filteredEvents} onOpen={(ev)=>setSelected(ev)} />
				) : (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="text-center py-20"
					>
						<p className="text-2xl text-gray-400 mb-4">No events found</p>
						<p className="text-gray-500">Try adjusting your search or filters</p>
					</motion.div>
				)}
			</motion.section>

			</div>{/* end container */}

			{/* Modal */}
			{selected && <EventModal event={selected} onClose={()=>setSelected(null)} />}
		</PublicLayout>
	)
}
