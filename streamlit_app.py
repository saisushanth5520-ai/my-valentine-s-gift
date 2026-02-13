import streamlit as st
import time
from datetime import datetime

# Configure the page
st.set_page_config(
    page_title="My Valentine's Gift",
    page_icon="❤️",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Custom CSS for styling
st.markdown("""
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .main {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .stApp {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        h1, h2, h3 {
            color: #ffffff;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .gift-box {
            background: linear-gradient(135deg, #FF6B6B, #FF8C8C);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            text-align: center;
        }
    </style>
""", unsafe_allow_html=True)

# Title
st.markdown("<h1>💝 A Special Valentine's Gift for Almas 💝</h1>", unsafe_allow_html=True)

# Subtitle with date
current_date = datetime.now().strftime("%B %d, %Y")
st.markdown(f"<p style='text-align: center; color: white; font-size: 18px;'>Created with love on {current_date}</p>", unsafe_allow_html=True)

# Create columns for layout
col1, col2, col3 = st.columns([1, 2, 1])

with col2:
    # Animated gift box
    if st.button("🎁 Open Your Gift!", key="open_gift"):
        st.balloons()
        
        # Display the gift message
        st.markdown("""
        <div style='background: linear-gradient(135deg, #FF6B6B, #FF8C8C); 
                    border-radius: 15px; 
                    padding: 30px; 
                    text-align: center;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);'>
            <h2 style='color: white; margin-bottom: 20px;'>A Message for You 💌</h2>
            <p style='color: white; font-size: 18px; line-height: 1.8;'>
                This Valentine's Day, I want you to know how special you are to me.<br><br>
                You bring joy, laughter, and meaning to my life every single day.
                Your smile brightens my darkest moments, and your presence makes
                everything feel right.<br><br>
                Thank you for being my partner, my best friend, and my love.
                I cherish every moment we share together.
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        # Add some spacing
        st.markdown("")
        
        # Display memories or additional content
        st.markdown("""
        <div style='background: rgba(255,255,255,0.1); 
                    border-radius: 15px; 
                    padding: 20px; 
                    text-align: center;
                    border: 2px solid rgba(255,255,255,0.3);'>
            <h3 style='color: white;'>Why I Love You ❤️</h3>
            <ul style='color: white; font-size: 16px; text-align: left; display: inline-block;'>
                <li>Your kindness and compassion</li>
                <li>Your infectious laugh</li>
                <li>Your intelligence and creativity</li>
                <li>The way you care for people</li>
                <li>Your beautiful soul</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    else:
        st.markdown("""
        <div style='background: rgba(255,255,255,0.1); 
                    border-radius: 15px; 
                    padding: 40px; 
                    text-align: center;
                    border: 3px dashed rgba(255,255,255,0.5);'>
            <p style='color: white; font-size: 20px; margin: 0;'>Click the button above to open your gift! 🎁</p>
        </div>
        """, unsafe_allow_html=True)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: rgba(255,255,255,0.8);'>
    <p>Made with ❤️ using Streamlit</p>
    <p style='font-size: 12px;'>This interactive Valentine's gift was created specially for someone special 💕</p>
</div>
""", unsafe_allow_html=True)
