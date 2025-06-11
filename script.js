class ExplorerGame {
    constructor() {
        this.gameStarted = false;
        this.gameEnded = false;
        this.startTime = null;
        this.score = 1000;
        this.attempts = 0;
        this.timerInterval = null;
        this.hintUsed = false;
        this.foundTargets = new Set(); // Para rastrear quais alvos foram encontrados
        
        // ============================================
        // ÁREA DE CONFIGURAÇÃO - MODIFIQUE AQUI
        // ============================================
        
        // Primeira área clicável (teste)
        this.targetArea1 = {
            x: 68.5,      // porcentagem da largura
            y: 91,      // porcentagem da altura  
            width: 2.7,   // porcentagem do comprimento do alvo
            height: 4.8, // porcentagem da altura do alvo
            id: 'target1',
            name: 'Louva-a-deus',
        };

        this.targetArea2 = {
            x: 37,     
            y: 15,      
            width: 3,   
            height: 5, 
            id: 'target2',
            name: 'Passaro Pardal'
        };

        this.targetArea3 = {
            x: 39.5,      
            y: 77.3,     
            width: 2,
            height: 3,
            id: 'target3',
            name: 'Besouro Rola Bosta'
        };

        this.targetArea4 = {
            x: 33.2,   
            y: 75.4, 
            width: 5,
            height: 2.5,
            id: 'target4',
            name: 'Lagarta'
        }

        this.targetArea5 = {
            x: 36,   
            y: 92.5,    
            width: 1.8, 
            height: 1.5, 
            id: 'target5',
            name: 'Grilo'
        };

        this.targetArea6 = {
            x: 22.2,      
            y: 83,      
            width: 2.25,   
            height: 3, 
            id: 'target6',
            name: 'Borboleta'
        };

        this.targetArea7 = {
            x: 3,
            y: 91,
            width: 2,
            height: 3.9,
            id: 'target7',
            name: 'Besouro'
        };

        // Lista de todas as áreas
        this.allTargets = [this.targetArea1, this.targetArea2,this.targetArea3,this.targetArea4,
                           this.targetArea5, this.targetArea6, this.targetArea7];
        
        // ============================================
        // FIM DA ÁREA DE CONFIGURAÇÃO
        // ============================================

        this.initializeGame();
    }

    initializeGame() {
        this.loadGameImage();
        this.setupEventListeners();
        this.updateDisplay();
    }

    loadGameImage() {
        const container = document.getElementById('gameContainer');
        const loading = document.getElementById('loading');
        
        // Caminho da imagem (ajuste conforme necessário)
        const imagePath = 'LogoAdesivos.png';
        
        const img = new Image();
        img.onload = () => {
            container.innerHTML = '';
            img.className = 'game-image';
            img.id = 'gameImage';
            container.appendChild(img);
            
            this.createAllTargetAreas();
            loading.style.display = 'none';
        };
        
        img.onerror = () => {
            console.error('Erro ao carregar imagem');
            this.createPlaceholderImage();
            loading.style.display = 'none';
        };
        
        img.src = imagePath;
    }

    createPlaceholderImage() {
        const container = document.getElementById('gameContainer');
        const loading = document.getElementById('loading');
        
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        canvas.className = 'game-image';
        canvas.id = 'gameImage';
        
        const ctx = canvas.getContext('2d');
        
        // Criar gradiente de fundo
        const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
        gradient.addColorStop(0, '#2d5a27');
        gradient.addColorStop(0.5, '#346831');
        gradient.addColorStop(1, '#4b784e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1200, 800);
        
        // Árvores de fundo
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 1200;
            const y = Math.random() * 400 + 200;
            const size = Math.random() * 50 + 30;
            
            ctx.fillStyle = '#1a3d1a';
            ctx.fillRect(x, y, size * 0.2, size);
            ctx.fillStyle = '#2d5a27';
            ctx.beginPath();
            ctx.arc(x + size * 0.1, y, size * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Desenhar primeiro explorador
        this.drawExplorer(ctx, 
            (this.targetArea1.x + this.targetArea1.width/2) * 12, // converter % para pixels
            (this.targetArea1.y + this.targetArea1.height/2) * 8
        );
        
        // Desenhar segundo explorador
        this.drawExplorer(ctx, 
            (this.targetArea2.x + this.targetArea2.width/2) * 12, // converter % para pixels
            (this.targetArea2.y + this.targetArea2.height/2) * 8,
            '#FF6B6B' // cor diferente para distinguir
        );
        
        // Adicionar texto de instrução
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Encontre os animais na floresta!', 600, 130);
        
        container.innerHTML = '';
        container.appendChild(canvas);
        this.createAllTargetAreas();
        loading.style.display = 'none';
    }

    // Função auxiliar para desenhar um explorador
    drawExplorer(ctx, x, y, shirtColor = '#8B4513') {
        // Corpo
        ctx.fillStyle = shirtColor;
        ctx.fillRect(x - 10, y - 15, 20, 30);
        
        // Cabeça
        ctx.fillStyle = '#F4C2A1';
        ctx.beginPath();
        ctx.arc(x, y - 20, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Chapéu
        ctx.fillStyle = '#654321';
        ctx.fillRect(x - 15, y - 32, 30, 8);
        ctx.fillRect(x - 12, y - 40, 24, 8);
        
        // Mochila
        ctx.fillStyle = '#228B22';
        ctx.fillRect(x + 8, y - 10, 8, 15);
    }

    // Criar todas as áreas alvo
    createAllTargetAreas() {
        const container = document.getElementById('gameContainer');
        
        this.allTargets.forEach(target => {
            const targetDiv = document.createElement('div');
            targetDiv.className = 'target-area';
            targetDiv.id = target.id;
            
            // Posicionar a área clicável
            targetDiv.style.left = target.x + '%';
            targetDiv.style.top = target.y + '%';
            targetDiv.style.width = target.width + '%';
            targetDiv.style.height = target.height + '%';
            
            // Adicionar evento de clique específico para este alvo
            targetDiv.addEventListener('click', (e) => this.handleTargetClick(e, target));
            container.appendChild(targetDiv);
        });
        
        // Adicionar listener para cliques fora das áreas alvo
        container.addEventListener('click', (e) => this.handleMissClick(e));
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
    }

    startGame() {
        this.gameStarted = true;
        this.gameEnded = false;
        this.startTime = Date.now();
        this.score = 1000;
        this.attempts = 0;
        this.hintUsed = false;
        this.foundTargets.clear();
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('hintBtn').disabled = false;
        
        this.startTimer();
        this.updateDisplay();
        
        // Mostrar instruções
        this.showMessage('Encontre os animais no Jardim! 🔍', 3000);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.gameStarted || this.gameEnded) return;
            
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Diminuir pontuação com o tempo
            if (elapsed > 0) {
                this.score = Math.max(100, 1000 - Math.floor(elapsed / 1000) * 5);
                this.updateDisplay();
            }
        }, 100);
    }

    handleTargetClick(e, target) {
        e.stopPropagation();
        
        if (!this.gameStarted || this.gameEnded) return;
        
        // Verificar se este alvo já foi encontrado
        if (this.foundTargets.has(target.id)) {
            this.showMessage('🎯 Você já encontrou este animal!', 2000);
            return;
        }
        
        this.attempts++;
        this.foundTargets.add(target.id);
        
        // Mostrar efeito de sucesso para este alvo específico
        this.showTargetFoundEffect(target);
        
        // Verificar se todos os alvos foram encontrados
        if (this.foundTargets.size >= this.allTargets.length) {
            this.gameWon();
        } else {
            // Bônus por encontrar um alvo
            this.score += 100;
            this.updateDisplay();
            this.showMessage(`✅ ${target.name} encontrad${target.name.includes('Animal') ? 'a' : 'o'}! ${this.allTargets.length - this.foundTargets.size} restante(s).`, 2500);
        }
    }

    handleMissClick(e) {
        if (!this.gameStarted || this.gameEnded) return;
        
        // Verificar se o clique foi em uma área alvo
        const isTargetClick = this.allTargets.some(target => e.target.id === target.id);
        if (isTargetClick) return;
        
        this.attempts++;
        this.score = Math.max(50, this.score - 25);
        this.updateDisplay();
        
        // Efeito visual de erro
        this.showMissEffect(e.clientX, e.clientY);
    }

    gameWon() {
        this.gameEnded = true;
        this.gameStarted = false;
        clearInterval(this.timerInterval);
        
        // Bônus por poucos tentativas
        if (this.attempts <= this.allTargets.length) this.score += 300; // Encontrou todos de primeira
        else if (this.attempts <= this.allTargets.length + 2) this.score += 150;
        
        // Penalidade por usar dica
        if (this.hintUsed) this.score -= 150;
        
        this.updateDisplay();
        this.showGameOver();
    }

    showTargetFoundEffect(target) {
        const container = document.getElementById('gameContainer');
        
        // Indicador "Encontrou!"
        const indicator = document.createElement('div');
        indicator.className = 'found-indicator success-effect';
        indicator.textContent = '🎉 Encontrou!';
        indicator.style.left = (target.x + target.width/2) + '%';
        indicator.style.top = (target.y - 5) + '%';
        indicator.style.transform = 'translateX(-50%)';
        
        container.appendChild(indicator);
        setTimeout(() => indicator.remove(), 3000);
        
        // Marcar visualmente o alvo como encontrado
        const targetElement = document.getElementById(target.id);
        if (targetElement) {
            targetElement.style.border = '3px solid #4CAF50';
            targetElement.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
        }
    }

    showMissEffect(x, y) {
        const container = document.getElementById('gameContainer');
        const rect = container.getBoundingClientRect();
        
        const miss = document.createElement('div');
        miss.className = 'found-indicator success-effect';
        miss.textContent = '❌ Continue procurando!';
        miss.style.background = 'rgba(244, 67, 54, 0.9)';
        miss.style.left = ((x - rect.left) / rect.width * 100) + '%';
        miss.style.top = ((y - rect.top) / rect.height * 100) + '%';
        miss.style.transform = 'translate(-50%, -100%)';
        
        container.appendChild(miss);
        setTimeout(() => miss.remove(), 2000);
    }

    showHint() {
        if (this.hintUsed || !this.gameStarted || this.gameEnded) return;
        
        this.hintUsed = true;
        document.getElementById('hintBtn').disabled = true;
        
        const container = document.getElementById('gameContainer');
        
        // Mostrar dica para todos os alvos não encontrados
        this.allTargets.forEach(target => {
            if (!this.foundTargets.has(target.id)) {
                const hint = document.createElement('div');
                hint.className = 'hint-glow success-effect';
                hint.style.left = (target.x + target.width/2 - 4) + '%';
                hint.style.top = (target.y + target.height/2 - 6) + '%';
                hint.style.width = '8%';
                hint.style.height = '12%';
                
                container.appendChild(hint);
                setTimeout(() => hint.remove(), 4000);
            }
        });
        
        this.showMessage('💡 Dê Zoom!', 4000);
    }

    showMessage(text, duration) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(76, 175, 80, 0.95);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 1500;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: bounce-in 0.5s ease-out;
        `;
        message.textContent = text;
        
        document.body.appendChild(message);
        setTimeout(() => message.remove(), duration);
    }

    showGameOver() {
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        const finalStats = document.getElementById('finalStats');
        finalStats.innerHTML = `
            <p><strong>Tempo:</strong> ${minutes}:${seconds.toString().padStart(2, '0')}</p>
            <p><strong>Tentativas:</strong> ${this.attempts}</p>
            <p><strong>Animais Encontrados:</strong> ${this.foundTargets.size}/${this.allTargets.length}</p>
            <p><strong>Pontuação Final:</strong> ${this.score}</p>
            ${this.hintUsed ? '<p style="color: #ff9800;">Dica utilizada</p>' : ''}
        `;
        
        document.getElementById('gameOver').style.display = 'flex';
    }

    resetGame() {
        this.gameStarted = false;
        this.gameEnded = false;
        this.startTime = null;
        this.score = 1000;
        this.attempts = 0;
        this.hintUsed = false;
        this.foundTargets.clear();
        
        clearInterval(this.timerInterval);
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('hintBtn').disabled = true;
        document.getElementById('gameOver').style.display = 'none';
        document.getElementById('timer').textContent = '00:00';
        
        // Limpar efeitos visuais e marcações
        document.querySelectorAll('.success-effect').forEach(el => el.remove());
        this.allTargets.forEach(target => {
            const targetElement = document.getElementById(target.id);
            if (targetElement) {
                targetElement.style.border = '';
                targetElement.style.backgroundColor = '';
            }
        });
        
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('attempts').textContent = this.attempts;
    }
}

// Inicializar o jogo quando a página carregar
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new ExplorerGame();
});

// Função global para reiniciar
function resetGame() {
    game.resetGame();
}