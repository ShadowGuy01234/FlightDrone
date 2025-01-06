import React, { useState } from 'react';

import { Link } from 'react-router-dom'; 
import '../styles/About.css';

const About = () => {
  
  return(
    <>
    <div className="DIV1">
        <h2>About Us</h2>
        <div className="ImageFounder">
        <img 
            src="src\Image\ankit sir 2.png" 
            alt="Founder" 
            className="founder-image"
        />
        </div>
        <span className="Hi">Hi</span> 
        <span className="description">
        I'm Ankit Kumar Mishra, founder of Flytium Drone Private Limited and a Ph.D. scholar at Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur. I'm passionate about advancing drone technology and its applications. At Flytium, we're developing innovative drone solutions while I simultaneously pursue research in this field.
        Beyond drones, our website offers a comprehensive selection of high-quality electronics at competitive prices. Our inventory includes components, tools, and devices for both hobbyists and professionals. </span>

    </div>

   


<div className="DIV2">
    
     <div className="Card1">
     <h2>Mission</h2>
       <p>
         To revolutionize drone technology and electronics distribution through innovation 
         and excellence, providing cutting-edge solutions that empower both hobbyists 
         and professionals in their technological endeavors.
       </p>
     </div>

     <div className="Card2">
     <h2>Vision</h2>
     <p>To become a leading force in drone innovation and electronics distribution, fostering a future where advanced technology is accessible, reliable, and transformative for businesses and individuals alike.</p>
     </div>


     <div className="Card3">
     <h2>Our value</h2>
     <p>Excellence in innovation, unwavering commitment to quality, customer satisfaction as our priority, and continuous learning in the ever-evolving field of technology.</p>
     </div>
     

</div>
    
      
  







    <div className="DIV3">
    <h3 className="stats-heading">Our Impact</h3>
    <div className="stats-container">
        <div className="stat-card">
            <div className="stat-card-inner">
                <div className="stat-card-front">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Products Sold</div>
                </div>
                <div className="stat-card-back">
                    <div className="stat-description">
                        We've successfully delivered over 500 high-quality drone and electronic products to customers worldwide, maintaining a perfect track record of customer satisfaction and product reliability.
                    </div>
                </div>
            </div>
        </div>

        <div className="stat-card">
            <div className="stat-card-inner">
                <div className="stat-card-front">
                    <div className="stat-number">30+</div>
                    <div className="stat-label">Countries Served</div>
                </div>
                <div className="stat-card-back">
                    <div className="stat-description">
                        Our global reach extends to more than 30 countries, providing innovative drone solutions and electronic components to customers across different continents and cultures.
                    </div>
                </div>
            </div>
        </div>

        <div className="stat-card">
            <div className="stat-card-inner">
                <div className="stat-card-front">
                    <div className="stat-number">50K+</div>
                    <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-card-back">
                    <div className="stat-description">
                        Over 50,000 satisfied customers have chosen our products and services, building a community of loyal tech enthusiasts and professional users who trust our expertise.
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>




    <div className="DIV4">
    <h2 className="team-heading">Our Team</h2>
    <div className="team-container">
        <div className="team-card">
            <div className="team-card-inner">
                <div className="team-image-container">
                    <div className="team-image-inner">
                        <div className="team-image-front">
                            {/* Placeholder for team member image */}
                            <img 
                                src="src/Image/me.png" 
                                alt="Team Member" 
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className="team-image-back">
                            <p>10+ years of experience in drone technology. PhD in Robotics. Led multiple successful drone projects.</p>
                        </div>
                    </div>
                </div>
                <div className="team-name">John Smith</div>
                <div className="team-role">Chief Technical Officer</div>
            </div>
        </div>

        <div className="team-card">
            <div className="team-card-inner">
                <div className="team-image-container">
                    <div className="team-image-inner">
                        <div className="team-image-front">
                            <img 
                                src="/api/placeholder/200/200" 
                                alt="Team Member" 
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className="team-image-back">
                            <p>Expert in electronics design with 8 years of experience. Specializes in drone control systems.</p>
                        </div>
                    </div>
                </div>
                <div className="team-name">Sarah Johnson</div>
                <div className="team-role">Lead Engineer</div>
            </div>
        </div>

        <div className="team-card">
            <div className="team-card-inner">
                <div className="team-image-container">
                    <div className="team-image-inner">
                        <div className="team-image-front">
                            <img 
                                src="/api/placeholder/200/200" 
                                alt="Team Member" 
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className="team-image-back">
                            <p>5+ years in product development. Masters in Aerospace Engineering. Innovation specialist.</p>
                        </div>
                    </div>
                </div>
                <div className="team-name">Mike Chen</div>
                <div className="team-role">Product Manager</div>
            </div>
        </div>

        <div className="team-card">
            <div className="team-card-inner">
                <div className="team-image-container">
                    <div className="team-image-inner">
                        <div className="team-image-front">
                            <img 
                                src="/api/placeholder/200/200" 
                                alt="Team Member" 
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className="team-image-back">
                            <p>7 years in operations management. Expert in supply chain and customer relations.</p>
                        </div>
                    </div>
                </div>
                <div className="team-name">Emma Davis</div>
                <div className="team-role">Operations Director</div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
};

export default About;