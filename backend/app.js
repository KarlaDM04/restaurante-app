const express = require('express');
const app = express();

app.use(express.json());

// --- DATOS EN MEMORIA ---
let pedidos = [];

// --- ENDPOINT 1: Obtener productos ---
app.get('/productos', (req, res) => {
    res.json([
        { nombre: "Pizza", precio: 120 },
        { nombre: "Hamburguesa", precio: 90 },
        { nombre: "Refresco", precio: 30 },
        { nombre: "Ensalada", precio: 70 }
    ]);
});

// --- ENDPOINT 2: Crear pedido ---
app.post('/pedido', (req, res) => {
    const pedido = req.body;

    if (!pedido.producto || !pedido.cantidad) {
        return res.status(400).json({ error: "Faltan datos: producto y cantidad son requeridos" });
    }

    pedidos.push(pedido);
    res.json({
        mensaje: "Pedido guardado correctamente",
        pedido
    });
});

// --- ENDPOINT 3: Obtener todos los pedidos ---
app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

// --- ENDPOINT 4: Eliminar pedido por índice ---
app.delete('/pedido/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= pedidos.length) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }

    const eliminado = pedidos.splice(id, 1);
    res.json({
        mensaje: "Pedido eliminado",
        pedido: eliminado[0]
    });
});

// --- SERVIDOR ---
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});


// --- ENDPOINT 5: Actualizar pedido ---
app.put('/pedido/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= pedidos.length) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }
    pedidos[id] = req.body;
    res.json({ mensaje: "Pedido actualizado", pedido: pedidos[id] });
});

// --- ENDPOINT 6: Buscar pedido por nombre ---
app.get('/pedido/buscar/:nombre', (req, res) => {
    const resultado = pedidos.filter(p => p.producto === req.params.nombre);
    res.json(resultado);
});