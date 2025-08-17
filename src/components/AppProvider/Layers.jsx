import React from 'react';
import Layer from './Layer';
import layers from './layers.json';

export default function Layers() {
    return (
        <div style={{ display: 'grid', gap: 12 }}>
            {layers.map((layer) => (
                <Layer
                    key={layer.concern}
                    concern={layer.concern}
                    noArrow={Boolean(layer.noArrow)}
                >
                    {layer.description}
                </Layer>
            ))}
        </div>
    );
}
