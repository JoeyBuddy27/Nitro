<template>
    <div>
      <div>GraphQL</div>
      <pre>{{ fetchedData }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // Define a ref to store the fetched data
  const fetchedData = ref(null)
  
  onMounted(async () => {
    try {
      // Perform the GraphQL request using $fetch
      const data = await $fetch('/api/contentstack/content/gql/sample_package/bltf5304438d1fd57eb', {
       method: 'POST',
         headers: {
            'Content-Type': 'application/graphql',
        },
       body: 
        `{title
        system {
        uid}
        from_price
        premium_title
        additional_package_summary {
        ticket
        travel
    }
        descriptions {
            description_type
		 					title
		 					content
		 					content_rich
		 					tour_features
    
        }
        }`
        // `items {
		// 				system {
		// 					uid
		// 				}
		// 				title
		// 				show_trustpilot
		// 				tour_highlights_title
		// 				accommodation_included_title
		// 				descriptions {
		// 					description_type
		// 					title
		// 					content
		// 					content_rich
		// 					tour_features
		// 					mediaConnection(limit: 7) {
		// 						edges {
		// 							node {
		// 								... on Image {
		// 									cloudflare_id
		// 									video_thumbnail_time
		// 									description
		// 									duration
		// 									media_type
		// 									alt_text
		// 									year_created
		// 									title
		// 									fileConnection {
		// 										...img_data
		// 									}
		// 								}
		// 							}
		// 						}
		// 					}
		// 				}
		// 				from_price
		// 				itinerary {
		// 					sample_itinerary_title
		// 					itinerary_description
		// 					daily_itinerary {
		// 						day
		// 						description
		// 						itinerary_imagesConnection {
		// 							...img_data
		// 				}
		// 					}
		// 				}
		// 				course_and_accommodation_main_title
		// 				map_default_zoom_level
		// 				mini_map_default_zoom_level
		// 				golf_included_title
		// 				course_text
		// 				accommodation_text
		// 				content_row {
		// 					title
		// 					content
		// 					content_rich
		// 					cta_title_link {
		// 						title
		// 						href
		// 					}
		// 					layout
		// 					media_videoConnection {
		// 						edges {
		// 							node {
		// 								... on Image {
		// 									cloudflare_id
		// 									video_thumbnail_time
		// 									description
		// 									duration
		// 									media_type
		// 									alt_text
		// 									year_created
		// 									title
		// 									fileConnection {
		// 										...img_data
		// 									}
		// 								}
		// 							}
		// 						}
		// 					}
						
		// 				}
		// 				package_usps
		// 				package_style
		// 				show_trustpilot
		// 				video_reference {
		// 					title
		// 					text
		// 					media_videoConnection {
		// 						edges {
		// 							node {
		// 								... on Image {
		// 									cloudflare_id
		// 									video_thumbnail_time
		// 									description
		// 									duration
		// 									media_type
		// 									alt_text
		// 									year_created
		// 									title
		// 									fileConnection {
		// 										...img_data
		// 									}
		// 								}
		// 							}
		// 						}
		// 					}
		// 				}
		// 				things_to_do_title
		// 				things_to_do {
		// 					title
		// 					text
		// 					cta {
		// 						title
		// 						href
		// 					}
		// 					mediaConnection {
		// 									edges {
		// 										node {
		// 											url
		// 											description
		// 											title
		// 										}
		// 									}
		// 								}
		// 				}
		// 				master_product_id
		// 				mediaConnection {
		// 					edges {
		// 						node {
		// 							... on Image {
		// 								cloudflare_id
		// 								video_thumbnail_time
		// 								description
		// 								duration
		// 								media_type
		// 								alt_text
		// 								year_created
		// 								title
		// 								fileConnection {
		// 									...img_data
		// 								}
		// 							}
		// 						}
		// 					}
		// 				}
		// 				default_imageConnection {
		// 					...img_data
		// 				}
		// 				media_title
		// 				package_highlights
		// 				package_name
		// 				package_title
		// 				package_heroConnection {
		// 					...img_data
		// 				}
		// 				package_type
		// 				package_url
		// 				accommodation_venuesConnection(limit: 4) {
		// 					edges {
		// 						node {
		// 							... on Venue {
		// 								title
		// 								url
		// 								full_name
		// 								short_name
		// 								prefer_short_name
		// 								description
		// 								rich_description
		// 								short_description
		// 								system {
		// 									uid
		// 								}
		// 								default_imageConnection {
		// 													edges {
		// 														node {
		// 															... on Image {
		// 																description
		// 																media_type
		// 																alt_text
		// 																fileConnection {
		// 																	...img_data
		// 																}
		// 															}
		// 														}
		// 													}
		// 												}
		// 								informationConnection {
		// 									edges {
		// 										node {
		// 											... on VenueData {
		// 												golfbreaks_id
		// 												venue_information {
		// 													official_star_rating
		// 												}
		// 												map_location {
		// 										latitude
		// 										longitude
		// 										zoom_level
		// 										}
		// 												location {
		// 													locationConnection {
		// 														edges {
		// 															node {
		// 																... on Location {
		// 																	location_name
		// 																	type
		// 																	fixed_location {
		// 																		parent_locationConnection {
		// 																			edges {
		// 																				node {
		// 																					... on Location {
		// 																					location_name
		// 																				}
		// 																				}
		// 																			}
																				
		// 																		}
		// 																	}
		// 																}
		// 															}
		// 														}
		// 													}
		// 												}
																				
		// 										}
		// 									}
		// 								}
		// 								}
		// 								automated_contentConnection {
		// 									edges {
		// 										node {
		// 											... on LeadProductAutomation {
		// 												review_score
		// 												review_count
		// 												lead_product {
		// 													price
		// 												}
		// 											}
		// 										}
		// 									}
		// 								}
		// 								sentence_name
		// 								on_sale
		// 								imagesConnection(limit: 3) {
		// 									totalCount
		// 									edges {
		// 										node {
		// 											... on Image {
		// 												cloudflare_id
		// 												video_thumbnail_time
		// 												description
		// 												duration
		// 												media_type
		// 												alt_text
		// 												year_created
		// 												title
		// 												fileConnection {
		// 													...img_data
		// 												}
		// 											}
		// 										}
		// 									}
		// 								}
		// 							}
		// 						}
		// 					}
		// 				}
		// 				primary_venueConnection {
		// 					edges {
		// 						node {
		// 							... on Venue {
		// 								system {
		// 									uid
		// 								}
		// 								package_page_tax_override
		// 								informationConnection{
		// 									edges {
		// 										node {
		// 											... on VenueData {
		// 												golfbreaks_id
		// 												${mapLocationData}
		// 											}
		// 										}
		// 									}
		// 								}
		// 								url
		// 							}
		// 						}
		// 					}
		// 				}
						
		// 			}`
       
    })
      fetchedData.value = data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  })
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  