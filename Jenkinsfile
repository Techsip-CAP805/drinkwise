pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel-token') // Jenkins credential ID for Vercel token
    }

    tools {
        nodejs "nodejs-lts" // The name of the Node.js installation
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Techsip-CAP805/drinkwise'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm install -g vercel'
                sh 'vercel --token $VERCEL_TOKEN --prod --confirm'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/out/**', allowEmptyArchive: true
        }

        success {
            echo 'Build and deployment succeeded!'
        }

        failure {
            echo 'Build or deployment failed!'
        }
    }
}
