import React, { Component } from 'react';

export default function HeaderComponent() {
        return (
            <div>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <link className='nav-link active' to='/my-images'>My Images</link>
                        </li>
                        <li className="nav-item">
                            <link className='nav-link' to='/upload'>Upload</link>
                        </li>
                    </ul>
                </nav>
            </div>
        );

}